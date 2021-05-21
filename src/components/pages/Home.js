import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const Home = () => {

  
    const [users, setUser] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [meta, setMeta] = useState({});
    const [filter, setFilter] = useState("");

    const onInputChange = e => {
      console.log(e);
      setFilter(e.target.value);
    };

    useEffect(() => {
        loadUsers();
    }, [pageNumber, filter]);

    const loadUsers = async () => {
        const result = await axios.get(`https://gorest.co.in/public-api/users?page=${pageNumber}&status=${filter}`);
        console.log(result.data.data);
        setMeta(result.data.meta);
        setUser(result.data.data);
    };

    const deleteUser = async id => {
        axios.defaults.headers.delete['Authorization'] = 'Bearer ' + '4e1a4db39dfa81822e987c9f53db5cd1d8fd25be1d9e254d1ee109c3a596553a';
        await axios.delete(`https://gorest.co.in/public-api/users/${id}`);
        console.log(id);
        loadUsers();
    };

    const previousPage = async () => {
      setPageNumber(pageNumber-1);
      
    } 
    
    const nextPage = async () => {
      setPageNumber(pageNumber+1);
      
    }

    const RenderTable = () => {
      return (
        <tbody>
        {users.map((user) => (
          <tr>
            <th scope="row">{user.id}</th>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.status}</td>
            <td>
              <Link className="btn btn-primary m-2" to={`/users/${user.id}`}>
                View
              </Link>
              <Link
                className="btn btn-outline-primary m-2"
                to={`/users/edit/${user.id}`}
              >
                Edit
              </Link>
              <Link
                className="btn btn-danger"
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
      );
    }

    return(
        <div className="container bg-light border shadow mt-4">
      <div className="mt-4">
        <h1 className="text-center">USER DATASET</h1>
        <div className="container bg-primary p-4 bordert shadow mt-4 form-check">
          <h3 className="text-white">Choose Status</h3>
          <input className="form-check-input m-2" type="radio" value="Active" name="status" onClick={e => onInputChange(e)} /> <label className="text-white form-check-label">Active</label>
          <br></br>
          <br></br>
          <input className="form-check-input m-2" type="radio" value="Inactive" name="status" onClick={e => onInputChange(e)} /> <label className="text-white form-check-label">Inactive</label>
          <br></br>
          <br></br>
        </div>
        <table className="table border shadow mt-4">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <RenderTable />
        </table>
        <div className="container bg-primary">
        {
          pageNumber !== 1 ?<button className="btn btn-light btn-block m-5" onClick={() => previousPage()}>Previous Page</button>:<></>
        }
        
        {
          meta?.pagination?.page !== meta?.pagination?.pages ?<button className="btn btn-warning btn-block m-5" onClick={() => nextPage()}>Next Page</button>:<></>
        }
      </div>
      </div>
      
    </div>

    );
};

export default Home;