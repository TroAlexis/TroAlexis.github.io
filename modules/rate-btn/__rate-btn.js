var stars = document.querySelectorAll('.rate-btn__star')

var i = 0

for (i = 0; i < stars.length; i++) {
    var star = stars[i];
    star.addEventListener('click',function (event) {
        event.preventDefault();
        return false;
    })
    star.addEventListener('click', function () {
        if (this.classList.contains('active')) {
            var nextSibling = this.nextElementSibling
            if (nextSibling && nextSibling.classList.contains('active')) {
                nextSibling.classList.remove('active');
                recursiveNextSiblings(nextSibling);
            }
        }
        else {
            this.classList.add('active');
            var prevSibling = this.previousElementSibling
            // console.log(sibling)
            if (prevSibling) {
                prevSibling.classList.add('active');
                recursivePrevSiblings(prevSibling);
            }
            // this.previousElementSibling.classList.add('active')
        }
    })
}


// HELPER FUNCTIONS

function recursivePrevSiblings(object) {
    var prevSibling = object.previousElementSibling
    if (prevSibling) {
        prevSibling.classList.add('active');
        recursivePrevSiblings(prevSibling);
    }
    else {
        return false;
    }
}

function recursiveNextSiblings(object) {
    var nextSibling = object.nextElementSibling
    if (nextSibling) {
        nextSibling.classList.remove('active');
        recursiveNextSiblings(nextSibling);
    }
    else {
        return false;
    }
}








// function noTextNodes(array) {
//     // Removes all text nodes
//     var children = [];
//     var allNodes = array.childNodes;
//     for (var i = 0; i < allNodes.length; i++) {
//         var node = allNodes[i]
//         if (node.nodeType === Node.ELEMENT_NODE) {
//             children.push(node)
//         }
//     }
//     return children;
// }