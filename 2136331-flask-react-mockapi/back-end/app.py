from flask import Flask, jsonify, json, request
import requests
app = Flask(__name__)

 

url = "https://6413eb02c469cff60d6dc398.mockapi.io/crud"



@app.route('/create' , methods = ['GET','POST'])
def create():
        request_data = json.loads(request.data)
        first_name = request_data['first_name']
        last_name = request_data['last_name']
        email = request_data['email']
        
        datastore = { 'first_name': first_name, 'last_name': last_name,'email': email }
        response = requests.post(url, data=datastore)

        if response.status_code == 200:
            return {'201': 'customer created successfully'}
        else:
            abort(500)



@app.route('/customers')
def display():
    response = requests.get(url)
    return response.json()

@app.route("/delete/<int:id>", methods=['POST'])
def delete(id):
    d_url = f'{url}/{id}'
    response = requests.delete(d_url)

    return {'204' : 'Customer deleted successfully'}

@app.route("/update/<int:id>", methods=['POST'])
def update(id):
    e_url = f'{url}/{id}'
    request_data = json.loads(request.data)
    first_name = request_data['first_name']
    last_name = request_data['last_name']
    email = request_data['email']
        
    datastore = { 'first_name': first_name, 'last_name': last_name,'email': email }
    response = requests.put(e_url, data=datastore)

    return {'201': 'customer updated successfully'}


if __name__ =="__main__":
    app.run(debug=True)