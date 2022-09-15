var script = document.createElement('script');
script.src = 'files/jquery-3.6.0.min.js';
document.getElementsByTagName('head')[0].appendChild(script);



///code to expand and collapse boxes.
///necessary code to implement this sourced from https://www.w3schools.com/howto/howto_js_collapsible.asp


var coll = document.getElementsByClassName("collapsible");
var i;


for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var answer = this.nextElementSibling;
    if (answer.style.maxHeight){
      answer.style.maxHeight = null;
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
    } 
  });
}



///functions to handle increase and decrease buttons for the merch page
/// information used for the counter buttons sourced from: https://blog.stackfindover.com/products-quantity-counter/
  function increaseCount(a, b) {
    var input = b.previousElementSibling;
    var value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
  }
  
  function decreaseCount(a, b) {
    var input = b.nextElementSibling;
    var value = parseInt(input.value, 10);
    if (value > 0) {
      value = isNaN(value) ? 0 : value;
      value--;
      input.value = value;
    }
  }

/// functions to calcualte total costs of items based on quantity and value
  function calculateTotal()
  {
    let  unit_price={
      autograph: 777,
      poster: 15,
      keyring: 7,
      hair:420    
    };
    let item_price={}


    item_price.keyring = ($("#qty_keyring").val() * unit_price.keyring )
    $("#price_keyring").val(item_price.keyring);
    
    item_price.autograph = ($("#qty_autograph").val() * unit_price.autograph )
    $("#price_autograph").val(item_price.autograph);
    
    item_price.poster = ($("#qty_poster").val() * unit_price.poster )
    $("#price_poster").val(item_price.poster);

    item_price.hair = ($("#qty_hair").val() * unit_price.hair )
    $("#price_hair").val(item_price.hair);    

    let total = item_price.keyring + item_price.autograph + item_price.poster + item_price.hair;
    $("#total_value").text(total);

    sessionStorage.setItem("ordertotal", total);

  }


  ///This is here to handle updates to the final price due to postage. It converts the stored cost to an int and the updates it.
/// It also is set to ensure that the checkout page will have 0 if no items have been purchased.

  function calculatePaymentTotal()
  {
    var ordertotal = parseInt(sessionStorage.getItem("ordertotal"));
    console.log(ordertotal);
    let postage_price={
      standardpost: 5,
      expresspost: 11,
    };

    if (this.id == "expresspost"){
      var checkouttotal = ordertotal + postage_price.expresspost}
    else if (this.id == "standardpost") {
      var checkouttotal = ordertotal + postage_price.standardpost}
    else{
      var checkouttotal = ordertotal + 0
    };

    $("#ordertotal").text(checkouttotal);

  }




/// This is used to check if there are values in all boxes as well as a selected option for all radio buttons
/// and then handles removing the payment button when clicked.
/// also handles making the text appear in place of the pay button.


function remove(el) {
  if(document.getElementById("cardno").value.length == 0 
  || document.getElementById("fullname").value.length == 0
  || document.getElementById("email").value.length == 0
  || document.getElementById("streetno").value.length == 0
  || document.getElementById("streetname").value.length == 0
  || document.getElementById("suburb").value.length == 0
  || document.getElementById("postcode").value.length == 0
  || document.getElementById("cardname").value.length == 0
  || document.getElementById("cardexp").value.length == 0
  || document.getElementById("cvv").value.length == 0
  || document.getElementById("cardoption1").checked == false && document.getElementById("cardoption2").checked == false && document.getElementById("cardoption3").checked == false
  || document.getElementById("expresspost").checked == false && document.getElementById("standardpost").checked == false
  )
{
alert("Please fill in all details and try again")
}
else{
  var element = el;
  element.remove();
  var x = document.getElementById("hidden");
    x.style.display = "block";}
}




///This allows changes to the total calculation on both clicking of buttons for increasing/decreasing the value, and on manual changes to the value for the merchandise page
/// as well as postage on the checkout.
  $(function()
 {
    $(".qty").on("keyup",calculateTotal);
    $(".counter").on("click",calculateTotal);
    $(".postage").on("click",calculatePaymentTotal);
})



