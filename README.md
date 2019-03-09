# `REST_APIs`

**Warning:** Things are simplified for brevity and lack of detailed knowledge!

## Aim of this talk:

Introduce you to the concepts of

- APIs
- Basic of REST
- HTTP-Requests including GET,POST,PUT, DELETE
- Headers, body, routes, params, queries etc
- Tools like Postman
- show a very minimal express example of how to build an API

## API:

> a set of functions and procedures allowing the creation of applications that access the features or data of an operating system, application, or other service.

Basically allowing one service/webpage to talk to another.

### What can I use APIs for:

Getting data from your own or another service, i.e github, weather, geocoding, stock/bitcoin prices, google, twitter, news websites and so much more.

[https://api.github.com/users/andreas-groos](https://api.github.com/users/andreas-groos)

[https://api.coindesk.com/v1/bpi/currentprice.json ](https://api.coindesk.com/v1/bpi/currentprice.json)

### Documentation of an API:

All APIs should have some documentation to explain their structure and operations.

[https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members](https://developer.twitter.com/en/docs/accounts-and-users/create-manage-lists/api-reference/get-lists-members)

## REST:

> Representational State Transfer (REST) is a software architectural style that defines a set of constraints to be used for creating Web services. Web services that conform to the REST architectural style, termed RESTful Web services (RWS), provide interoperability between computer systems on the Internet. RESTful Web services allow the requesting systems to access and manipulate textual representations of Web resources by using a **uniform** and **predefined** set of **stateless** operations. Other kinds of Web services, such as SOAP Web services, expose their own arbitrary sets of operations.

## HTTP Requests:

### URLs:

![url](_v_images/_url_1551972873_468527314.png)

Paths can be more complex, there can be multiple parameters, ports are often not included in production.

As a best practice, almost of developers are recommending following way. If you want to identify a resource, you should use Path Variable. But if you want to sort or filter items, then you should use query parameter.

The query string starts with an `?`, parameters are usually key value pairs, multiple parameters are seperated by an `&`.

### Example of an API URL:

[https://api.twitter.com/1.1/lists/members.json?slug=team&owner_screen_name=twitterapi&cursor=-1](https://api.twitter.com/1.1/lists/members.json?slug=team&owner_screen_name=twitterapi&cursor=-1)

### HTTP METHODS:

There are basically 4 HTTP methods, sometime called verbs:

`GET`,`POST`, `PUT`,`DELETE`.

`GET` is used to purely request information, `POST` is used to create something, `PUT` is used to modify something, `DELETE` is used to delete something. They respond loosly to database operations but are not directly coupled.

### HTTP status codes:

Every request returns a status code from 100 to 599:

`200`: Success
`204`: No content
`400`: Bad request
`401`: Unauthorized
`404`: Not found
`500`: Internal Server Error
and many more

## Building our API:

We'll be using `express` the most popular web application framework for `node`. It's possible to write everything in plain `node` but `express` will help us a lot. Alternatives to `express` are 'koa`and`hapi`for`node` but you can do the same functionality in other programming languages.
