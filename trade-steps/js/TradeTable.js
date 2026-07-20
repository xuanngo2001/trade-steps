/**
 * Trade details table class.
 *  Class to manipulate the table.
 */

function TradeTable(parentID)
{
  this.parentID = parentID;
}

TradeTable.prototype.create = function ()
{
  this.table_html = '<table><tr><th></th><th>Shares</th><th>Price</th><th>Cost</th><th>Action</th></tr>';
}

TradeTable.prototype.addRow = function (portion, share, price, cost)
{
  // Row to table.
  this.table_html += this.buildHtmlRow(portion, share, price, cost);
};

// Build and return html row.
TradeTable.prototype.buildHtmlRow = function (portion, share, price, cost)
{
  var row_html='<tr>';
  row_html+='<td>'+portion+'</td>';
  row_html+='<td>'+this.getInputHtml(share, 10)+'</td>';
  row_html+='<td>'+this.getInputHtml(price, 10)+'</td>';
  row_html+='<td class="number-2">'+cost+'</td>';

  // Add action icons: ADD, REMOVE.
  row_html+='<td><input name="add-trade" type="button" value="Add"/> <input name="remove-trade" type="button" value="Remove"/></td>';

  // Close row.
  row_html+='</tr>';
  
  return row_html;
}


// Close the table.
TradeTable.prototype.close = function ()
{
  this.table_html +='</table>';
  
  $(this.parentID).append(this.table_html);
}


/*****************************
 *
 *  PRIVATE functions.
 *
 *****************************/

// Return uniform <input> for share and price.
TradeTable.prototype.getInputHtml = function (value, width)
{
  return '<input type="text" value="'+value+'" maxlength="'+width+'" size="'+width+'" />'; 
};