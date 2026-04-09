Q1: What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer:
=> getElementById is used to select an element from HTML file with ID attribute.
=> getElementsByClassName is used to select an element from HTML file with Class attribute.
=> querySelector is more dynamic way of selecting an HTML element, we can select both Id & Class just by putting # or . before the attribute name. e.g: (#main-heading) or (.paragraph).
=> While querySelector only select the first element from the HTML document, querySelectorAll helps us to select all element from the HTML document & give it to us in Node list that is similar looking to JS Array.


Q2: How do you create and insert a new element into the DOM?
Answer:
=> To create an element write document.createElement("Element Name") and save it in a variable e.g: let newElement = document.createElement("h1").
=> To insert this element in HTML document mention where to place it in the document & it's position. e.g: document.body.append(newElement)


Q3: What is Event Bubbling? And how does it work?
=> Event Bubbling means when an event happens on a Target Element & propagate through it's parent element in the DOM tree.
=> When an event is triggered in an element it first run on the target element where it actually happened. After that it start moving upward through the DOM going from child to parent and keep going like that until it reaches the document. While moving up if any parent  element have any event listener it will get executed.

Q4: What is Event Delegation in JavaScript? Why is it useful?
=> Event Delegation means instead of adding event listener to each individual child element we add a single event listener to their parent element.
=> Since events bubble up from child to parent the parent listener can catch all the clicks that happen inside it. Then we check what was actually clicked using event.target or event.target.closest() to figure out which child triggered the event. It is useful if we have multiple buttons inside a container, instead of writing separate event listeners we just write 1 on the container. if new child elements are added later the parent listener catches those too without any extra code.


Q5: What is the difference between preventDefault() and stopPropagation() methods?
=> preventDefault() is used to stop the default browser behavior of an element. For example when we click a form submit button, by default the browser refreshes the page and writing event.preventDefault() inside the handler stops that from happening. The event still bubbles up normall, just the default action is cancelled.
=> stopPropagation() is used to stop the event from bubbling up to parent elements. For example if we have a click listener on both a button and its parent div clicking the button normally triggers both, writing event.stopPropagation() inside the button's handler stops the event from reaching the parent div.