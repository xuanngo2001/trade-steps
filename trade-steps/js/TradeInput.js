/**
 * Trade information class return basic informations of a trade:
 *    total amount, share price, commission fee, trade portions.
 */

function TradeInput()
{}

// Return the total amount.
TradeInput.prototype.getAmount = function ()
{
  return Number($("#total-amount").val());
}

TradeInput.prototype.getSharePrice = function ()
{
  return Number($("#share-price").val());
}

TradeInput.prototype.getCommissionFee = function ()
{
  return Number($("#commission-fee").val());
}

// Return an array of portions.
TradeInput.prototype.getPortions = function ()
{
  return $("#trade-portions").val().split(',');
}
