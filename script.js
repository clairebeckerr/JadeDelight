
//count the number of numbers in a string
function countnums(input){
  let count = 0;
  for (let i = 0; i < input.length; i++) {
          const element = input[i];       
          if (isFinite(element)) {
              count++;
          }
  }
  return count;
}//end countnums

//round money to 2 decimal places
function Round(num){
  return Math.round((num) * 100) / 100
}//end round


$(document).ready(function(){
  //if delivery is clicked: show
  $(".address").hide();
  $("input[name = 'p_or_d']").change(function() {
  var pord = $("input[name='p_or_d']:checked").val();
  if (pord == "pickup") {
    $(".address").hide();
  }
  if (pord == "delivery") {
    $(".address").show();
  }
  }); //end pickup & delivery fun
  
  //fill in boxes when quantity chosen
  $('.selectQuantity').change(function() {     
    var overall_total = 0;
    var subtotal = 0;
    var tax = 0;
    var quantities = ["quan0", "quan1", "quan2", "quan3", "quan4"];
    var allcost = document.getElementsByName("cost");
    
    for (var i = 0; i < quantities.length; i++) {
      //read in quantity and calculate cost
      var number = $('select[name="' + quantities[i] + '"]').find(":selected").val();
      var price = menuItems[i].cost;
      var totalcost = price * number;
      allcost[i].value = totalcost;
      subtotal += totalcost;
    } 
    tax = Round((subtotal)*.0625);
    overall_total = Round(overall_total + subtotal + tax);

    //fill in totals
    document.getElementsByName("subtotal")[0].value = subtotal;
    document.getElementsByName("total")[0].value = overall_total;
    document.getElementsByName("tax")[0].value = tax;
  }); //end quantity change
  
  //add time correctly to order
  function addMin(min) {
    finishTime = new Date((new Date()).getTime() + (min*60*1000));
    return finishTime;
  } //end addMin
  
  //submit button
  $('input[type=button]').click(function() {
    //read in all data
    var actual_time;
    var quantities = ["quan0", "quan1", "quan2", "quan3", "quan4"];
    var allcost = document.getElementsByName("cost");
    var pord = $("input[name='p_or_d']:checked").val();

    //adjust expectedtime based on method
    if (pord == "pickup") {
      actual_time = addMin(20);
    }
    if (pord == "delivery") {
      actual_time = addMin(40);
    }

    //validate input and print results
    if (validate()){
      var subtotal = document.getElementById('subtotal').value;
      var tax = document.getElementById('tax').value;
      var total = document.getElementById('total').value;
      myWindow = window.open();
      for (var i = 0; i < quantities.length; i++) {
        var number = $('select[name="' + quantities[i] + '"]').find(":selected").val();
        var price =  menuItems[i].cost;
        var name = menuItems[i].name;
        myWindow.document.write(name + ": " + price + " per item. " + "You ordered: " + number + ". You pay: $" + Round(1.0625*(price*number)) + "<br/>" );
      }
      myWindow.document.write("Subtotal: $" + subtotal + "<br/>");
      myWindow.document.write("Tax: $" + tax + "<br/>");
      myWindow.document.write("Total: $" + total + "<br/>");
      myWindow.document.write("Time ready: " + actual_time + "<br/>");
    }
    }); //end submit button
}); //end document.ready

// validate form input
function validate() {
  let name = document.forms["myForm"]["lname"].value;
  let phone = document.forms["myForm"]["phone"].value;
  let total_val = document.forms["myForm"]["total"].value;
  let street = document.forms["myForm"]["street"].value;
  let city = document.forms["myForm"]["city"].value;
  var pord = $("input[name='p_or_d']:checked").val();

  //check at least one item is picked
  if(total_val == 0){
    alert("No items selected.");
    return false;
  }
  else if (name == ""){ //check if last name was inputted
    alert("No last name inputted.");
    return false;
  } 
    //check if phone was inputted
  else if (phone == ""){ 
    alert("No phone number inputted.");
    return false;
  } 
    //check for correct phone length
  else if (!(countnums(phone) == 7 || countnums(phone) == 10)){ 
    alert("Phone number is not correct length.")
    return false;
  } 
  //checks for delivery
  if (pord == "delivery") {
    //check if street has info
    if(street == ""){
      alert("No street inputted.");
      return false;
    }
    //check if city has info
    else if (city == ""){
      alert("No city inputted.");
      return false;
    } 
  }
  alert("Thank you for your order!");
  return true;
} //end validate
