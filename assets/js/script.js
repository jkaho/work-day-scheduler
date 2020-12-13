$(document).ready(function() {

    // display current date below title 
    var currentDay = moment().format('dddd, MMMM Do, YYYY');
    $("#currentDay").text(currentDay);

    // colorcode timeblocks to indicate whether they are in the past, present or future
    var currentHour = moment().format('H');
    $(".time-block").each(function() {
        if (parseInt(currentHour) === parseInt(this.id)) {
            $(this).addClass("present");
        } else if (parseInt(currentHour) > parseInt(this.id)) {
            $(this).addClass("past");
        } else {
            $(this).addClass("future");
        }
    })

    // client-side storage for events
    var storedEvents = [];

    initialise();

    function renderEvents() {
        $("textarea").each(function() {
            this.value = "";
        })
        
        $.each(storedEvents, function() {
            $("textarea." + this.eventTime)[0].value = this.eventText;
        }) 
    }

    function initialise() {
        var userEvent = JSON.parse(localStorage.getItem("storedEvents"));
        if (userEvent !== null) {
            storedEvents = userEvent;
        }

        renderEvents();
    }

    function storeEvents() {
        localStorage.setItem("storedEvents", JSON.stringify(storedEvents));
    }

    $(".saveBtn").on("click", function(event) {
        event.preventDefault();

        var className = $(event.target).attr("class");

        var eventObject = {
            eventTime: className,
            eventText: $("textarea." + className)[0].value
        }

        if (storedEvents.length > 0) {
            $.each(storedEvents, function() {
                if (this.eventTime === event.target.className) {
                    storedEvents.splice($.inArray(this, storedEvents), 1);
                }    
            });
        }

        storedEvents.push(eventObject);
        
        $.each(storedEvents, function() {
            if (this.eventText === "") {
                storedEvents.splice($.inArray(this, storedEvents), 1);
            }
        })

        storeEvents();
        renderEvents();
    })
});

// delete event if user saves empty textarea 
// style save buttons