angular.module('con4', [])
	.controller('GameController', function($scope){
		
		$scope.newGame = function(){
			$scope.victory = false;
            buildGrid();
            $scope.activePlayer = '#CE7867';
            /**
			 * set victory to false
			 * $scope.grid = buildGrid();
			 * This is connect 4 so red plays first
			 */
		}
		
		function buildGrid(){
            
            $scope.grid = [];
            
            for (var x=0; x < 6; x++){
                $scope.grid[x]=[];
                for (var y = 0; y < 7; y++){
                    $scope.grid[x][y]={row:x, col:y}
                }
            } 
        }

		
		$scope.dropToken = function(col){
            if ($scope.victory){
                return;
            }

			if($scope.grid[0][col].hasToken){
				return;
			}

			 var row = checkSouth(0, col);

             var cell = $scope.grid[row][col];
			 cell.hasToken = true;
             cell.color = $scope.activePlayer;
             

             endTurn();
             checkVictory(cell);
			
			//endTurn and checkVictory
		}
		
		function checkSouth(row, col){

            
            if ($scope.grid[row][col].hasToken){
                return row -1
            }

            
            if (row >= 5){
                return row 
            }

			
            row++;
            return checkSouth(row,col);

		}
		
		function checkVictory(cell){

			
			var horizontalMatches = 0;
			//Check Horizontal
			horizontalMatches += checkNextCell(cell, 0, 'left');
			horizontalMatches += checkNextCell(cell, 0, 'right');
			
			//Check Vertical
			var verticalMatches = 0;
			verticalMatches += checkNextCell(cell, 0, 'bottom');
			
			//Check DiagLeftUp and RightDown
			var diagLeft = 0;
			diagLeft += checkNextCell(cell, 0, 'diagUpLeft');
			diagLeft += checkNextCell(cell, 0, 'diagBotRight');
			
			//Check DiagRigthUp and LeftDown
			var diagRight = 0;
			diagRight += checkNextCell(cell, 0, 'diagUpRight');
			diagRight += checkNextCell(cell, 0, 'diagBotLeft');
			
			if(verticalMatches >= 3 || horizontalMatches >= 3 || diagLeft >= 3 || diagRight >= 3){
			    $scope.victory = true;  
                
			}
		}
        

       
		
		function getNextCell(cell, direction){
            
            var nextRow = cell.row;
			var nextCol = cell.col;
            
            
            if (direction === 'left'){
                nextCol--;
            } else if (direction === 'right'){
                nextCol++;
            } else if (direction === 'bottom'){
                nextRow ++;
            } else if (direction === 'diagUpLeft'){
                nextCol--;
                nextRow--;
            } else if (direction === 'diagUpRight'){
                nextCol++;
                nextRow--;
            } else if (direction === 'diagBotLeft'){
                nextCol--;
                nextRow++;
            } else if (direction === 'diagBotRight'){
                nextCol++;
                nextRow++;
            }
            
            if (nextRow < 0 || nextRow > 5 || nextCol > 6){
                return null;
            }
            
            return $scope.grid[nextRow][nextCol];
            
		}
		
		function checkNextCell(cell, matches, direction){
			
         
            var nextCell = getNextCell(cell, direction)
            
            if(nextCell && nextCell.hasToken && nextCell.color === cell.color){
                matches ++;
                return checkNextCell(nextCell,matches,direction)
            } else {
                return matches;
            }

		}
		
		function endTurn(){
            
            if ($scope.activePlayer === '#CE7867'){
                $scope.activePlayer = '#26A1FA'
            } else if ($scope.activePlayer === '#26A1FA'){
                $scope.activePlayer = '#CE7867'
            }

		}
	});
    