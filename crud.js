const form=document.getElementById('my-form');
const ul=document.getElementById('users');


//Creating new Users - POST
form.addEventListener('submit', addProducts)
function addProducts(e)
{
    e.preventDefault();
    const input1=document.getElementById('price').value;
    const input2=document.getElementById('username').value;
    const obj = { input1, input2 }

axios
    .post('https://crudcrud.com/api/58651c7aae85450e9b27fb91569ff3b3/RESTAPIProject', obj)
    .then( (res) =>
    {
            showOutput(res.data)
    })
    .catch( (err) =>
    {
            console.log(err);
    })

    document.getElementById('price').value='';
    document.getElementById('username').value='';
}



//Show result in Screen
function showOutput(obj)
{
    ul.innerHTML = ul.innerHTML +
    `<br><li id=${obj._id}>
    ${obj.input1} - ${obj.input2} :
    <button class='btn btn-danger' onclick=deleteProduct('${obj._id}')>Delete Product</button>
    <button class='btn btn-primary' onclick=editProducts('${obj.input1}','${obj.input2}','${obj._id}')>Edit Product</button>
    </li>`;
}



//Page refreshed show all users - GET
async function displayAllUsers()
{
    try
    {
    const response = await axios.get('https://crudcrud.com/api/58651c7aae85450e9b27fb91569ff3b3/RESTAPIProject');
    ul.innerHTML='';
    response.data.forEach(products => {
        showOutput(products)
    }); }

    catch(error)
    {
        console.log(error)
    }

    finally
    {
        console.log('Got all the Products');
    }
}
window.addEventListener('DOMContentLoaded', displayAllUsers)




//Deleting user from Screen & CrudCrud - DELETE
function deleteProduct(delId)
{
    axios
    .delete(`https://crudcrud.com/api/58651c7aae85450e9b27fb91569ff3b3/RESTAPIProject/${delId}`)
    .then( (res) => {
        removeUser(delId)
    })
    .catch( (err) => {
        console.log(err);
    })
}



//Remove user from Screen
function removeUser(delId)
{
    const userToDelete=document.getElementById(delId);
        if(userToDelete)
        {
            ul.removeChild(userToDelete);
        }
}



//Edit users from Screen & CrudCrud - PUT
function editProducts(input1, input2, editId)
{
    document.getElementById('price').value=input1;
    document.getElementById('username').value=input2;
    const updateObj = { input1, input2 }

    axios
    .put(`https://crudcrud.com/api/58651c7aae85450e9b27fb91569ff3b3/RESTAPIProject/${editId}`, updateObj)
    .then( (res) => {
                    deleteProduct(editId);
                    displayAllUsers();
                    })
    .catch( (err) => {
    console.log(err)
})
}





