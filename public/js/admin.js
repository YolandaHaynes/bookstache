const bookLookUp = document.querySelector("#bookLookUpButton")
bookLookUp.addEventListener('click', lookUpBook)

const addBook = document.querySelector("#addBook")
addBook.addEventListener('click', addABook)

async function lookUpBook() {
    const isbn = document.getElementById("inputIsbn").value
    if (isbn.length < 10) {
        document.getElementById("title").innerHTML = "No book found by that ISBN";
        return false;
    }
    try {
        const response = await fetch(`book/searchisbn?isbn=${isbn}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        if (data.title){
            document.getElementById("title").innerHTML = data.title;
            document.getElementById("image").src = data.image;
            document.getElementById("author").innerHTML = data.author;
            document.getElementById("isbn10").innerHTML = data.isbn10;
            document.getElementById("isbn13").innerHTML = data.isbn13;
            document.getElementById("description").innerHTML = data.description;
            const button = document.getElementById("addBook");
            button.classList.remove("hidden")
        } else {
            document.getElementById("title").innerHTML = "No book found by that ISBN";
        }

    } catch (err) {
        console.log(err)
    }
}

async function addABook() {
        const title = document.getElementById("title").innerHTML
        const image = document.getElementById("image").src
        const author = document.getElementById("author").innerHTML
        const isbn10 = document.getElementById('isbn10').innerHTML
        const isbn13 = document.getElementById('isbn13').innerHTML
        const description = document.getElementById('description').innerHTML
        // console.log(title)
        try {
            const response = await fetch(`book/addBook`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title,
                        image,
                        author,
                        isbn10,
                        isbn13,
                        description,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const data = await response.json()
                // console.log(data)
                if (data.status === 'saved'){
                    window.location.href = "/feed"
                }
            } catch (err) {
            console.log(err)
        }
    }