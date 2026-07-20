/*
	Main function().
*/

$(document).ready(function(){
	
	// Specify validation rules.
	$("form[name='trade-inputs']").validate({
		
		wrapper: 'div',
		rules: {
			"total-amount": "required",
			"share-price":	{
								required: true,
								biggerThanZero: true
							},
			"trade-portions":	{
								required: true,
							}
		},
		// Specify validation error messages
		messages: {
			"total-amount": { required: "Enter your total capital." }
		},

	});
		// Custom validations.
		$.validator.addMethod("biggerThanZero",
			function(value, element) {
				if (value > 0) { return true; } else { return false; }
			},
			"Must be bigger than zero."
		);  
	
	// Catch validation process and don't submit.
	$("form[name='trade-inputs']").on('submit', function(e) {
		var isvalid = $("form[name='trade-inputs']").valid();
		if (isvalid) {
			e.preventDefault();	// Don't submit.
			onShowTradesClick();// Run your process.
		}
	});

});

/**
 * Remove all children of element but keep the element.
 * @param id
 */
function remove_all_child_elements(id)
{
	var node = document.getElementById(id);
	while (node.firstChild)
	{
	  node.removeChild(node.firstChild);
	} 
}

function onShowTradesClick()
{
	// Show trades.
	remove_all_child_elements("trade-details"); // Clear trade-details table first.
	
	var tradeInput = new TradeInput();
	
	var total_amount = tradeInput.getAmount();
	var share_price = tradeInput.getSharePrice();
	var commission_fee = tradeInput.getCommissionFee();
	var trade_portions = tradeInput.getPortions();
	var number_of_trades = trade_portions.length;
	
	// Get total proportion.
	var total_portion = 0;
	for(var i=0; i < number_of_trades; i++)
	{
		total_portion += parseInt(trade_portions[i]);
	}
	
	// Calculate 1 portion amount.
	var portion_amount = (total_amount-(number_of_trades*commission_fee)) / total_portion; // Note: Subtract commission fees.
	
	// Display trades result.
	var tradeTable = new TradeTable("#trade-details");
	tradeTable.create();
	for(var i=0; i < number_of_trades; i++)
	{
		var shares = Math.floor(trade_portions[i]*portion_amount/share_price);
		var cost = (shares*share_price).toFixed(2);
		
		tradeTable.addRow(trade_portions[i], shares, share_price, cost);
	}
	tradeTable.close();
	
	
	TradeSummary.updateOnChange();
}

