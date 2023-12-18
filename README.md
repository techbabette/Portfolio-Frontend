# Frontend for [my Portfolio Website](https://portfolio-frontend-4lvdpvifl-marinakrsticrf-gmailcom.vercel.app/#/)

## Tech stack

The frontend is built in Vue 2 and takes advantage of the Vue Ecosystem with Vuex, Vue-Router and Axios.

The frontend is hosted on Vercel, while the backend is hosted on AWS.

The backend initially serves the list of projects and any further changes are only saved locally, allowing anyone who wants to play around with the website to do so without impacting anyone else's experience of it, I highly encourage it and so the
[login page](https://portfolio-frontend-4lvdpvifl-marinakrsticrf-gmailcom.vercel.app/#/login) includes admin credentials already filled in.

## Notable custom components

### [Comma separated array](https://github.com/techbabette/Portfolio-Frontend/blob/master/src/components/inputs/TextArray.vue)

This component allows the user to list several values into a text field, separating them with commas (by default).

The component returns an array of values, shown to the user under the input field as buttons.

Clicking a button removes the corresponding value.

![Input in action.](https://i.imgur.com/FrecYcr.gif "Input in action")

Covered by [this test spec](https://github.com/techbabette/Portfolio-Frontend/blob/master/src/components/inputs/TextArray.cy.js).

### [Generic admin table](https://github.com/techbabette/Portfolio-Frontend/blob/master/src/components/inputs/TextArray.vue)

This is a highly reusable component that shows only the data that we want it to show, the way we want to show it.

The table takes in an array of header objects, each with a desired header title and field it shows the value of.

Header objects can also include a change function, which changes how the value is displayed to the end user.

The following header object results in a header titled "Technologies used" that reads the Technologies field and transforms it from an array of strings into a joined string.

```
{
    Text : "Technologies used",
    Field : "Technologies",
    Change : function(arrayOfTechnologies){
        let technologiesString = arrayOfTechnologies.join(", ");
        return technologiesString.length > 0 ? technologiesString : "/"
    }
}
```


![Resulting table](https://i.imgur.com/TP2MNLL.png "Resulting table")

Options are passed alongside headers and represent actions that can be performed on a result row, an option object consists of a name, an on-click function and styling (in the form of class names).

```
Options : [
    {
        Name : "Edit",
        class : "btn btn-dark mx-1", 
        onClick : (event) => {
            let requestedId = parseInt(event.target.dataset.id)

            this.$router.push({name : "Manage projects", params : {id : requestedId}})
        }
    },
    {
        Name : "Delete",
        class : "btn btn-danger",
        onClick : (event) => {
            let requestedId = parseInt(event.target.dataset.id);

            this.$store.commit("deleteProject", requestedId);
        }
    }
]
```
