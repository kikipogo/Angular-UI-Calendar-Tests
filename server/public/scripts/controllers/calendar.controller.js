myApp.controller('CalendarController', function(){
  console.log('Calendar Controller was loaded');
  var self = this;
  self.eventSources = []
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
      eventClick: self.alertEventOnClick,
      eventDrop: self.alertOnDrop,
      eventResize: self.alertOnResize

});
