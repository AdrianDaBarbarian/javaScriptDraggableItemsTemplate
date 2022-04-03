const draggables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        console.log("drag start")
        draggable.classList.add("dragging")
    } )

    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging")
    })
})

    containers.forEach(container => {
        container.addEventListener("dragover", e => {
            e.preventDefault() /*changes cursor so when outside container, not alowed cursor, inside ok*/
            const afterElement = getDragAfterElement(container, e.clientY) /*position of mouse on screen*/
            const draggable = document.querySelector(".dragging")
            console.log(afterElement)
            if (afterElement == null) {
                container.appendChild(draggable)
            } else {
                container.insertBefore(draggable, afterElement)
            }
        } )
})

/*function takes in container # & y mouse position; determins mouse position and whatever element our mouse is after*/
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".draggable:not(.dragging")]

   return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}