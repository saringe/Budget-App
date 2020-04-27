const budgetController = (function (){
    
   
})();


const UIcontroller = (function (){



})();

const appController = (function (budgetCtrl, UICtrl){

    var AddCtrlItem = function () {
         // 1. Get the input data
        
        // 2. update the input item to the budget controller

        // 3. update the input item to the UI

        // 4. calculate the budget

        // 5. display the calculated budget
        console.log("works")
    }

   document.querySelector('.add__btn').addEventListener('click', AddCtrlItem);

   document.addEventListener('keypress', function (event){

    if (event.keyCode === 13 || event.which === 13){
        AddCtrlItem();
    };

   });
})(budgetController, UIcontroller);