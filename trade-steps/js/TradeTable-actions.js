/**
 * Trade table actions:
 *    -ADD, REMOVE buttons
 *    -ON CHANGE, update cost.
 **/
 
 
$(document).ready(function(){

	// REMOVE
	// ***************
	$('#trade-details').on('click', 'input[name="remove-trade"]', function(e){
		$(this).closest('tr').remove();
		TradeSummary.updateOnChange();
	})
  
	// ADD
	// ***************
	$('#trade-details').on('click', 'input[name="add-trade"]', function(e){
		var tradeTable = new TradeTable();
		var html_row = tradeTable.buildHtmlRow('?', 0, 0, 0);
		$(this).closest('tr').after(html_row);
	})
    
	// ON CHANGE, Update cost.
	// ***************
	$('#trade-details').on('change', 'input', function(){
		TradeSummary.updateOnChange();
	});
  
});
