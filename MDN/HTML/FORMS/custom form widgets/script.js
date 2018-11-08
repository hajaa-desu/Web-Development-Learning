
// ------- //
// HELPERS //
// ------- //

NodeList.prototype.forEach = function (callback) {
  Array.prototype.forEach.call(this, callback);
}

// -------------------- //
// Function definitions //
// -------------------- //

function deactivateSelect(select) {
  if (!select.classList.contains('active')) return;

  var optList = select.querySelector('.optList');

  optList.classList.add('hidden');
  select.classList.remove('active');
}


// Make sure only one select widget is active and deactivate the rest
function activeSelect(select, selectList) {
  if (select.classList.contains('active')) return;

  selectList.forEach(deactivateSelect);
  select.classList.add('active');
};

function toggleOptList(select, show) {
  var optList = select.querySelector('.optList');

  optList.classList.toggle('hidden');
}

function highlightOption(select, option) {
  var optionList = select.querySelectorAll('.option');

  optionList.forEach(function (other) {
    other.classList.remove('highlight');
  });

  option.classList.add('highlight');
};


// This function updates the displayed value and synchronizes it with the native widget
// It takes two parameters:
// select : the DOM node with the class 'select' containing the value to update 
// index : the index of the value to be selected 
function updateValue(select, index) {
  // We need to get the native widget for the given custom widget 
  // In our example, that native widget is a sibling of the custom widget 
  var nativeWidget = select.previousElementSibling; 

  // We also need to get the value placeholder of our custom widget
  var value = select.querySelector('.value'); 

  // And we need the whole list of options
  var optionList = select.querySelectorAll('.option');

  // Make sure that all the options are not selected
  optionList.forEach(function (other) {
    other.setAttribute('aria-selected', 'false');
  })

  // Make sure the chosen option is selected
  optionList[index].setAttribute('aria-selected', 'true');
  
  // We set the selected index to the index of our choice 
  nativeWidget.selectedIndex = index; 

  // We update the value placeholder accordingly
  value.innerHTML = optionList[index].innerHTML; 

  // And we highlight the corresponding option of our custom widget 
  highlightOption(select, optionList[index]); 
}

// This function returns the current selected index in the native widget 
// It takes one parameter:
// select : the DOM node with the class 'select' related to the native widget 
function getIndex(select) {
  // We need to access the native widget for the given custom widget 
  // In our example, that native widget is a sibling of the custom widget 
  var nativeWidget = select.previousElementSibling; 

  return nativeWidget.selectedIndex;
}
// ------------- //
// Event binding //
// ------------- //

window.addEventListener("load", function () {
  var form = document.querySelector('form');
 
  form.classList.remove("no-widget");
  form.classList.add("widget");
});

window.addEventListener('load', function () {
  var selectList = document.querySelectorAll('.select');

  selectList.forEach(function (select) {
    var optionList = select.querySelectorAll('.option');

    optionList.forEach(function (option) {
      option.addEventListener('mouseover', function () {
        highlightOption(select, option);
      });
    });

    select.addEventListener('click', function (event) {
      toggleOptList(select);
    },  false);

    select.addEventListener('focus', function (event) {
      activeSelect(select, selectList);
    });

    select.addEventListener('blur', function (event) {
      deactivateSelect(select);
    });
  });
}); 


window.addEventListener('load', function() {
  var selectList = document.querySelectorAll('.select');

  // Each custom widget needs to be initialized 
  selectList.forEach( function (select) {
    var optionList = select.querySelectorAll('.option'),
      selectedIndex = getIndex(select); 

    // We make our custom widget focusable 
    select.tabIndex = 0; 

    // We make the native widget no longer focusable 
    select.previousElementSibling.tabIndex = -1; 

    // We make sure that the default selected value is correctly displayed 
    updateValue(select, selectedIndex);

    // Each time a user clicks on an option, we update the value accordingly
    optionList.forEach(function (option, index) {
      option.addEventListener('click', function (event) {
        updateValue(select, index);
      });
    });

    // Each time a user uses their keyboard on a focused widget, we update the value accordingly
    select.addEventListener('keyup', function (event) {
      var length = optionList.length,
        index = getIndex(select); 

        // When the user hits the down arrow, we jump to the next option
        if (event.keyCode == 40 && index < length - 1) { index++; }

        // When the user hits the up arrow, we jump to the previous option 
        if (event.keyCode == 38 && index > 0) { index--; }

        updateValue(select, index);
    });

  });
})
//*/