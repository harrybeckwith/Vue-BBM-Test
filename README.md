# Bought By Many - Frontend Candidate Task

## The Task

We'd like you to develop a small prototype application to allow users to browse a list of customers together with their pet insurance quotes and policies.

Please **only spend 2-3 hours** on this. We're not expecting you to finish the app, we're more interested to see how you approach the task so just do what you can in the time you have.

Some example pages have been created for you but you don't have to use them (if you do, there may be some improvements you can make):

* [Customer list](http://localhost:8080/customers)
* [Quote list](http://localhost:8080/quotes)
* [Policy list](http://localhost:8080/policies)

Here are some examples of features you could add, but feel free to be as creative as you wish:

* Choosing a customer displays their details along with a list of their quotes and policies.
* Choosing a quote or policy displays the details of that quote or policy.
* Customers are sorted by their `registered` field by default.
* Users can deep link to customers, quotes and policies.
* Sort order of lists can be chosen.
* Users can search for a customer, quote or policy.

When you have finished, you can either send over you solution as a zip file or add a [collaborator to your repository](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/inviting-collaborators-to-a-personal-repository). Let us know which you'd prefer and we will provide details the relevant details.

Good luck!

## Getting set up

1. Download and install [Node.js](https://nodejs.org/)

1. Create a [new private repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-new-repository) within your Github account

1. Duplicate the `boughtbymany/fe-candidate-javascript-task` and mirror-push it to your newly created repository. See [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository) for instructions on how to do this.

1. Clone the repository you created.

1. Install dependencies:

    ```bash
    npm install
    ```

1. Run the app:

    ```bash
    # This will start an API server at http://localhost:3000
    #   and the app at http://localhost:8080

    npm run serve
    ```

## A few things to help get you started

The app was created with [Vue CLI](https://cli.vuejs.org/).

### Data API

This project exposes a REST API using [JSON Server](https://github.com/typicode/json-server) at `http://localhost:3000` which can be used to fetch the data for the app. This is automatically started when running the app but can be run seperately with:

```bash
npm run db
```

Examples:

* Customers - <http://localhost:3000/customers>
* Quotes - <http://localhost:3000/quotes>
* Policies - <http://localhost:3000/policies>

Specific customer/quotes/policies can be fetched by appending the `uuid` to the end of the URL, e.g. `http://localhost:3000/customers/fb2b4c61-940e-468a-ad92-69b05ca57e16`

#### Raw Data

The raw data can be seen in [src/db.json](src/db.json)

### Styling

* Pages don't need to be high-fidelity designs but you can make use of the existing SASS in [src/sass](src/sass).
