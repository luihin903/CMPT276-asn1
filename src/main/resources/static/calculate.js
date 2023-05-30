// Create Variables

var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03, 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];
var bounds = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 0]
var distribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var button = document.querySelector("input[value = 'Submit']")

grades.sort(dsc)
draw()

function asc(a, b) {
    return a - b
}

function dsc(a, b) {
    return b - a
}

function draw() {
    // reset distribution
    for (var i = 0; i < distribution.length; i ++) {
        distribution[i] = 0;
    }

    // counts students of each grade
    for (var i = 0; i < bounds.length; i ++) {
        for (var j = 0; j < grades.length; j ++) {
            if (grades[j] >= bounds[i]) {
                distribution[i] += 1;
            }
        }
    }

    // change the sum to difference
    for (var i = distribution.length - 1; i > 0; i --) {
        distribution[i] -= distribution[i - 1];
    }

    // change the bar
    squares = document.getElementsByClassName("square")
    for (var i = 0; i < distribution.length; i ++) {
        var num = distribution[i] * 10
        squares[i].style.width = num.toString() + "px"
        squares[i].innerHTML = num / 10
    }
}

button.addEventListener("click", function(evt) {
    evt.preventDefault()

    // get new bounds
    elements = document.getElementsByClassName("Bound")
    for (var i = 0; i < bounds.length; i ++) {
        bounds[i] = elements[i].value
    }

    // get new grade
    grade = document.getElementsByClassName("New")[0].value
    
    // check bounds validation (number orders)
    var error = false
    for (var i = 0; i < bounds.length - 1; i ++) {
        if (Number(bounds[i]) < Number(bounds[i + 1])) {
            document.getElementsByClassName("Error")[0].innerHTML = "Invalid Bounds Error"
            error = true
        }
    }

    // check bounds validation (characters)
    for (var i = 0; i < bounds.length; i ++) {
        var count = 0;
        for (var j = 0; j < 10; j ++) {
            if (bounds[i].search(j) == -1) {
                count ++;
            }
        }
        if (count == 10) {
            document.getElementsByClassName("Error")[0].innerHTML = "Invalid Bounds Error"
            error = true
        }
    }

    // check new grade validation (characters)
    if (grade.length != 0) {
        var count = 0
        for (var i = 0; i < 10; i ++) {
            if (grade.search(i) == -1) {
                count ++;
            }
        }
    }

    // check new grade validation (maximum)
    max = Number(document.getElementsByClassName("Max")[0].value)
    if (Number(grade) > max) {
        document.getElementsByClassName("Error")[0].innerHTML = "Grade Maximum Error"
        error = true
    }

    if (count == 10) {
        document.getElementsByClassName("Error")[0].innerHTML = "Invalid Grade Error"
        error = true
    }

    if (error == false) {
        document.getElementsByClassName("Error")[0].innerHTML = ""
        if (grade.length != 0) {
            grades.push(Number(grade))
            grades.sort(dsc)
        }
        document.getElementsByClassName("New")[0].value = ""
        draw()
    }
})

window.addEventListener("keypress", processKey)

function processKey(evt) {
    if (evt.key == "Enter") {
        evt.preventDefault()

        // get new bounds
        elements = document.getElementsByClassName("Bound")
        for (var i = 0; i < bounds.length; i ++) {
            bounds[i] = elements[i].value
        }

        // get new grade
        grade = document.getElementsByClassName("New")[0].value
        
        // check bounds validation (number orders)
        var error = false
        for (var i = 0; i < bounds.length - 1; i ++) {
            if (Number(bounds[i]) < Number(bounds[i + 1])) {
                document.getElementsByClassName("Error")[0].innerHTML = "Invalid Bounds Error"
                error = true
            }
        }

        // check bounds validation (characters)
        for (var i = 0; i < bounds.length; i ++) {
            var count = 0;
            for (var j = 0; j < 10; j ++) {
                if (bounds[i].search(j) == -1) {
                    count ++;
                }
            }
            if (count == 10) {
                document.getElementsByClassName("Error")[0].innerHTML = "Invalid Bounds Error"
                error = true
            }
        }

        // check new grade validation (characters)
        if (grade.length != 0) {
            var count = 0
            for (var i = 0; i < 10; i ++) {
                if (grade.search(i) == -1) {
                    count ++;
                }
            }
        }

        // check new grade validation (maximum)
        max = Number(document.getElementsByClassName("Max")[0].value)
        if (Number(grade) > max) {
            document.getElementsByClassName("Error")[0].innerHTML = "Grade Maximum Error"
            error = true
        }

        if (count == 10) {
            document.getElementsByClassName("Error")[0].innerHTML = "Invalid Grade Error"
            error = true
        }

        if (error == false) {
            document.getElementsByClassName("Error")[0].innerHTML = ""
            if (grade.length != 0) {
                grades.push(Number(grade))
                grades.sort(dsc)
            }
            document.getElementsByClassName("New")[0].value = ""
            draw()
        }
    }
}