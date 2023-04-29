Path: `/api/auth`

Method: GET

Description: Authenticates a user.

***

Path: `/api/auth/login`

Method: POST

Description: Logs a user in

***


Path: `/api/auth/logout`

Method: GET

Description: Logs a user out


***

Path: `/api/auth/signup`

Method: POST

Description: Creates a new user and logs them in

***

Path: `/api/auth/unauthorized`

Method: GET

Description: Returns unauthorized JSON when flask-login authentication fails

***

Path: `/api/users/`

Method: GET

Description: gets all users

***

Path: `/api/users/<int:id>`

Method: GET

Description: gets a single user by id


***

path: `api/projects/`

method: POST

description: create a new project

***

path: `api/projects/`

method: GET

description: get all projects

***

path: `api/projects/<int:id>`

method: GET

description: get a project by id

***

path:` api/projects/<int:id>`

method: PUT

description: update a project by id

***

path: `api/projects/<int:id>`

method: DELETE

description: delete a project by id

***

path: `api/projects/<int:id>/file`

method: POST

description: add a file to a project

***

path: `api/projects/<int:id>/file`

method: GET

description: get all files for a project

***

path: `api/projects/<int:id>/file/<int:file_id>`

method: GET

description: get a file for a project

***

path: `api/projects/<int:id>/file/<int:file_id>`

method: PUT

description: update a file for a project

***

path: `api/projects/<int:id>/file/<int:file_id>`

method: DELETE

description: delete a file for a project


***
Path: `/api/template/`

Method: GET

Description: Get all templates

***

Path: `/api/template/`

Method: POST

Description: Create a new template

***

Path: `/api/template/<int:id>`

Method: GET

Description: Get a template by id

***

Path: `/api/template/<int:id>`

Method: PUT

Description: Update a template by id

***

Path: `/api/template/<int:id>`

Method: DELETE

Description: Delete a template by id

***

Path `/api/publish/`

Method: POST

Description: Publish a template

***

Path: `/api/publish/`

Method: GET

Description: Get all published templates

***

Path: `/api/publish/<int:id>`

Method: GET

Description: Get a published template by id

***

Path: `/api/publish/<int:id>`

Method: PUT

Description: Update a published template by id

***

Path:` /api/publish/<int:id>`

Method: DELETE

Description: Delete a published template by id

***

Path: `/api/projects/<int:id>/file/<int:file_id>/content`

Method: GET

Description: Get the content of a file in a project

***

Path: `/api/projects/<int:id>/file/<int:file_id>/content`

Method: PUT

Description: Update the content of a file in a project

***

Path: `/api/projects/<int:id>/file/<int:file_id>/content`

Method: DELETE

Description: Delete the content of a file in a project
