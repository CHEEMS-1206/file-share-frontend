import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function AllContributors(props) {
  const navigate = useNavigate();
  const [contributors, setContributors] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchContributors();
  }, []);

  const fetchContributors = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/receiver/all-contributors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const contributorsData = await response.json();
        setContributors(contributorsData);
        setTotalPages(Math.ceil(contributorsData.length / 10));
      } else {
        console.error("Failed to fetch contributors");
        toast.error("Failed to fetch contributors.");
      }
    } catch (error) {
      console.error("Error fetching contributors:", error);
      toast.error("Some error occurred try re logging in.");
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleViewDetails = (e,contributorId) => {
    e.stopPropagation();
    navigate(`/about-contributor/${contributorId}`);
  };

  return (
    <>
      <Header
        setIsLoggedIn={props.setIsLoggedIn}
        isLoggedIn={props.isLoggedIn}
        userType={props.userType}
      />
      <div className="container">
        {contributors.length > 0 ? (
          <>
            <div className="contributors-table-container">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="table-title">Sr.</TableCell>
                    <TableCell className="table-title">Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contributors
                    .slice((page - 1) * 10, page * 10)
                    .map((contributor, index) => (
                      <TableRow
                        key={contributor.user_id}
                        style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          handleViewDetails(e, contributor.user_id)
                        }
                      >
                        <TableCell style={{ color: "#1421DC" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell style={{ color: "crimson" }}>
                          {contributor.user_username}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              className="pagination"
            />
          </>
        ) : (
          <Typography className="no-contributors-content">
            No Contributors to show.
          </Typography>
        )}
      </div>
    </>
  );
}

export default AllContributors;
