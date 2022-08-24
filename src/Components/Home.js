import React, { useState, useEffect, useMemo } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Pagination from "./PaginationButtons";

const Home = () => {
  const [user, setUser] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [eachPageData, setEachPageData] = useState([]);

  let PageSize = 10;

  useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const productViewedfromPages = firstPageIndex + PageSize;
    const getEachPgData = user.slice(firstPageIndex, productViewedfromPages);
    setEachPageData(getEachPgData);
    console.log(getEachPgData);
    return getEachPgData;
  }, [currentPage, user]);

  const apiCall = () => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((respone) => respone.json())
      .then((users) => {
        setUser(users);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);

  const handleInput = (e) => {
    let searchInfo = e.target.value;
    setSearchValue(searchInfo);
    const newArr = user
      .filter((item) => item.name.toLowerCase().includes(searchInfo.toLowerCase()))
      .map((item) => {
        let newTitle = item.name;
        return {
          ...item,
          name: newTitle,
        };
      });
    setSearchData(newArr);
    console.log(newArr);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e) => handleInput(e)}
          value={searchValue}
        />
        <Button variant="outline-secondary" id="button-addon2">
          Button
        </Button>
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>TagLine</th>
            <th>First Brewed</th>
          </tr>
        </thead>
        <tbody>
          {searchValue.length === 0 ? (
            <>
              {eachPageData.map((users) => {
                return (
                  <tr key={users.id}>
                    <td>{users.id}</td>
                    <td>{users.name}</td>
                    <td>{users.tagline}</td>
                    <td>{users.first_brewed}</td>
                  </tr>
                );
              })}
            </>
          ) : (
            <>
              {searchData.map((users) => {
                return (
                  <tr key={users.id}>
                    <td>{users.id}</td>
                    <td>{users.name}</td>
                    <td>{users.tagline}</td>
                    <td>{users.first_brewed}</td>
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalCount={user?.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Home;
