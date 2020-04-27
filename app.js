const budgetController = (function (){
    
   
})();


const UIcontroller = (function (){

    var DOMStrings = {
        inputType : '.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputButton : '.add__btn'
    }

    return {
        getInput : function (){
            return {
                 type : document.querySelector(DOMStrings.inputType).value,
                 description : document.querySelector(DOMStrings.inputDescription).value,
                 value : document.querySelector(DOMStrings.inputValue).value
            }
           
        }, 
        getDOMStrings : function (){
            return DOMStrings;
        }
    }

  

})();
 
const appController = (function (budgetCtrl, UICtrl){
    var DOM = UICtrl.getDOMStrings();
    var AddCtrlItem = function () {
         // 1. Get the input data
                var input = UICtrl.getInput();
                console.log(input);
        // 2. update the input item to the budget controller

        // 3. update the input item to the UI

        // 4. calculate the budget

        // 5. display the calculated budget
       
    }

   document.querySelector(DOM.inputButton).addEventListener('click', AddCtrlItem);

   document.addEventListener('keypress', function (event){

    if (event.keyCode === 13 || event.which === 13){
        AddCtrlItem();
    };

   });
})(budgetController, UIcontroller);