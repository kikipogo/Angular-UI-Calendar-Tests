myApp.controller('CalendarController', function($uibModal, $log, $document){
  console.log('Calendar Controller was loaded');
  var self = this;
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();
  self.selectedDay = "testing";

  self.eventSources = [[
    {title: 'All Day Event',start: new Date(y, m, 1)},
    {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
    {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
    {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
    {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
  ]];

  self.alertDayClick = function( date, jsEvent, view){
      self.addModal = (date.title + ' was clicked ');
      console.log("day click works ", date);
      self.selectedDay = "Open Day!";
      self.open();
  };
  self.eventOnClick = function( date, jsEvent, view){
    console.log(date.title + ' was clicked ');
    console.log(jsEvent);
    console.log(view);
    self.selectedDay = "Event!";
    self.open();
  };

  self.open = function (size, parentSelector) {
    console.log('opening modal');
    var parentElem =
    parentSelector ?
      angular.element($document[0].querySelector('.thing ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: self.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/test.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      // replace this with event data
      resolve: {
        title: function () {
          return self.selectedDay;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

// //modal
// //modal
// var uid = storage;
//   console.log("uid in openCal ", uid);
//  //modal
//   self.alertEventClick = function( event, jsEvent, view){
//    console.log("Event click works ", event);
//   self.modalTitle = event.title;
//    self.modalDay = moment(event.start).format('dddd, MMMM Do YYYY');
//    self.modalStart = moment(event.start).format("h:mm a");
//    self.modalEnd = moment(event.end).format("h:mm a");
//    self.modalDescription = event.description;
//   // self.modalFirstName = storage.getFirstName();
//   //  self.modalLastName = storage.getLastName();
//   self.eventKey = event.id;
//    self.event = event;
//    // console.log("scope event ", $scope.event);
//    $("#signupModal").modal({show: true});
// };



// //end modal

  /* config object */
  self.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'month basicWeek basicDay agendaWeek agendaDay',
        center: 'title',
        right: 'today prev,next'
      },
      eventClick: self.eventOnClick,
      // eventClick: self.alertEventClick,
      eventDrop: self.alertOnDrop,
      eventResize: self.alertOnResize,
      dayClick: self.alertDayClick

    }
  };
});
