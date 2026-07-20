/**
 * TradeSummary class.
 *	Test:
 *		Total amount	-	Total cost	-	Commission fee	=	Balance
 *		10,000.00		-	9,968.00	-	29.97			=	2.03
 
 *			Shares	Price		Cost
 *		1	 766		1		 766
 *		5	3834		1		3834
 *		7	5368		1		5368
 */

function TradeSummary()
{}

TradeSummary.updateOnChange = function ()
{
	// Get commission fee.
	var tradeInput = new TradeInput();
	var commission_fee = tradeInput.getCommissionFee();

	// UPDATE cost.
	var total_cost = 0;
	var total_fee = 0;
	var total_share = 0;
    
	$("#trade-details > table > tbody > tr:not(:first-child)").each(function() {
		var share = Number($(this).find("td:nth-child(2) > input").val());
		var share_price = Number($(this).find("td:nth-child(3) > input").val());
		var cost = share * share_price;
					
		total_cost += cost; // Recalculate total_cost.
		total_share += share; 

		// Add fee if cost > 0.
		if (cost > 0)
		{
			total_fee += commission_fee;
		}
		 
		cost = cost.toFixed(2);
		$(this).find("td:nth-child(4)").text(cost);
		
	});
  
    // UPDATE balance.
	TradeSummary.update(total_cost, total_fee, total_share);

}

TradeSummary.update = function (total_cost, total_fee, total_share)
{
	$("#trade-summary").empty(); // Clear trade summary first.

	// Get numbers.
	var tradeInput = new TradeInput();
	var total_amount = tradeInput.getAmount();
	var balance = total_amount - total_cost - total_fee;
	var average_price = (total_cost + total_fee) / total_share;

	// Reformat numbers and append.
	total_amount= parseFloat(total_amount).toFixed(2);
	total_cost  = parseFloat(total_cost).toFixed(2);
	balance     = parseFloat(balance).toFixed(2);
	average_price = average_price.toFixed(4);
  
	// Create table holding summary infos.
	var summary_html = '<br />';
		summary_html += '<table><tr>'+
									'<th>Total amount</th><th>-</th>'+
									'<th>Total cost</th><th>-</th>'+
									'<th>Commission fee</th><th>=</th>'+
									'<th>Balance</th>'+
								'</tr>';
												
		summary_html += '<tr>'+
							'<td class="number-2">'+total_amount+'</td><td>-</td>'+
							'<td class="number-2">'+total_cost+'</td><td>-</td>'+
							'<td class="number-2">'+total_fee+'</td><td>=</td>'+
							'<td class="number-2">'+balance+'</td>'+
						'</tr>';

		summary_html += '</table>';

		// Share and average price
		summary_html += '<div class="final-label"><br/>';
			summary_html += '<span>Total shares: </span><span class="number-0">'+total_share+'</span><br />';
			summary_html += '<span>Average price: </span><span class="number-5">'+average_price+'</span>';
		summary_html += '</div>';
		
		// Append
		$('#trade-summary').append(summary_html);

	// Trigger number formatting using jquery-number.
	$('.number-0').number( true, 0 );
	$('.number-2').number( true, 2 );
	$('.number-5').number( true, 5 );     
}
