# nckInventory
Inventory endpoints for NCK clients

# POST	/admin/items
	for admin to upload new items
	Request Body Fields:
	- name:(string, required) the name of the item to be uploaded
	- price: (string/integer, required) this is converted into an integer internally, unit price of the item
	- quantity:(string/integer, required) this is converted into an integer internally, the amount of item to be uploaded that is available for sale

	     RESPONSES:
	Failure, status 400, if at least one of the request fields not received
	Success, status 200, if the POST request was successful and item uploaded

# GET 	/admin/items/{itemId}
	for admin to read inventory items
	      Request PARAMETER:
	- itemId :(string, required) the id of the item to be read
	RESPONSES :
	Success, status 200, if the item is found. The item object (itemObj) is returned in the payload
	Success Response Body Fields:
	- message, overview of the request status
	- content, an object containing the object of the item read
	Failure, status 404, if no item is found with the specified itemId.
	Failure Response Body Fields:
	- message, an overview of the request status

# PATCH	/admin/items/{itemId}
	for admin to update already existing item in the inventory
	Request Paramater:
	- itemId: (string, required) the id of the item to be patched
	Request Body Fields:
	- name: (string, required) new name of the item, if changed
	- price: (string, required) new price of the item, if changed
	- quantity:(string, required) new quantity available of the item, if changed

	Responses:
	Success, status 204, no payload/content
	Failure, status 400 or 404 if no item is found with the specified item id

# DELETE	 /admin/items/{itemId}
	for admin to delete existing items in the inventory
	Request Parameter:
	- itemId: (string, required) the id of the item to be deleted
	Responses:
	Success, status 200, if successfully deleted with body
	Failure, status 404, if no item was found with the specified item id

# POST 	/auth
	to authenticate user
	Request Body Field:
	- userEmail :(string, required) the email address of the user to be authenticated
	Responses:
	Failure, status 400, if userEmail not received
	Success Response Body:
	- an object containing fields: token and userEmail 
	
# POST	 /cart
	for authenticated users to add item to cart
	Request Body Fields:
	- token:(string, required) the token received from /auth endpoint for this particular user
	- itemId :(string, required) the id of the item to be added to cart
	- quantity :(integer, required) the number of units the user would like to purchase. 
	Responses:
	Success, status 200, if successfully added to cart
	Failure, status 500, 400, 403, 404, if error encourtered

# GET 	/items/{itemId}
	for authenticated users to read item already existing in the inventory
	Request Parameter:
	- token: (string, required) the token received from /auth endpoint for this particular user
	- itemId :(string, required) the id of the item to be read
	Responses:
	Success, status 200, if item found. Payload contains an object with the item details
	Failure, status 400, 403, 404, if not found or encountered error
	
	

	
	
			
