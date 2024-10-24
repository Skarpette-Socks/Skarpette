import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  TablePagination,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DataItem from "../../types/DataItem";
import { fetchAllData } from "../../api/fetchAllData";
import { Link, useNavigate } from "react-router-dom";
import { deleteItem } from "../../api/deleteItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 16px",
  fontSize: 14,
  borderRight: "1px solid #d0d0d0",
  "&:last-child": {
    borderRight: "none",
  },
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
    borderBottom: "2px solid #d0d0d0",
    fontSize: 14,
  },
  "&.size-cell": {
    fontSize: 14,
    whiteSpace: "normal",
    wordBreak: "break-word",
  },
  "&.price-cell": {
    fontSize: 14,
  },
  "&.price-cell.lined": {
    textDecoration: "line-through",
    opacity: 0.5,

  },
  "&.discount-cell": {
    fontSize: 14,
  },
  "&.name-cell": {
    whiteSpace: "normal",
    wordBreak: "break-word",
    fontSize: 14,
  },
  "&.actions-cell": {
    padding: "4px 8px",
    minWidth: "100px",
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "& td": {
    borderRight: "1px solid #d0d0d0",
    "&:last-child": {
      borderRight: "none",
    },
  },
}));

const ImageCell = styled("img")({
  width: "40px",
  height: "40px",
  objectFit: "contain",
});


const ProductTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selected, setSelected] = useState<number[]>([]);
  const [socks, setSocks] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchAllData()
      setSocks(result);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = socks.map((sock) => sock.vendor_code);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, vendor_code: number) => {
    const selectedIndex = selected.indexOf(vendor_code);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, vendor_code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (vendor_code: number) => selected.indexOf(vendor_code) !== -1;

  const deleteThisItem = (id: string) => {
    deleteItem(id);
    navigate(0);
  }

  if (loading) {
    return ('Завантаження...');
  }

  return (
    <Paper
      style={{
        width: "100%",
        marginTop: "20px",
      }}
    >
      <TableContainer style={{ maxHeight: "620px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" sx={{ width: "48px" }}>
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < socks.length
                  }
                  checked={socks.length > 0 && selected.length === socks.length}
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              <StyledTableCell className="name-cell" sx={{ width: "15%" }}>
                Назва
              </StyledTableCell>
              <StyledTableCell sx={{ width: "8%", textAlign: "center" }}>
                Фото
              </StyledTableCell>
              <StyledTableCell sx={{ width: "10%", textAlign: "center" }}>
                Артикул
              </StyledTableCell>
              <StyledTableCell sx={{ width: "10%", textAlign: "center" }}>
                Категорія
              </StyledTableCell>
              <StyledTableCell sx={{ width: "10%", textAlign: "center" }}>
                Стиль
              </StyledTableCell>
              <StyledTableCell
                className="size-cell"
                sx={{ width: "12%", textAlign: "center" }}
              >
                Розмір
              </StyledTableCell>
              <StyledTableCell
                className="price-cell"
                sx={{ width: "5%", textAlign: "center" }}
              >
                Ціна
              </StyledTableCell>
              <StyledTableCell
                className="discount-cell"
                sx={{ width: "5%", textAlign: "center" }}
              >
                % знижки
              </StyledTableCell>
              <StyledTableCell sx={{ width: "5%", textAlign: "center" }}>
                Спец. ціна
              </StyledTableCell>
              <StyledTableCell
                className="actions-cell"
                sx={{ width: "100px", textAlign: "center" }}
              >
                Дії
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {socks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((sock) => {
                const isItemSelected = isSelected(sock.vendor_code);
                const allSizes = sock.size.filter(s => s.is_available).map(s => s.size).join(', ');
                
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, sock.vendor_code)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={sock.vendor_code}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox" sx={{ width: "48px" }}>
                      <Checkbox checked={isItemSelected} />
                    </StyledTableCell>
                    <StyledTableCell className="name-cell">
                      {sock.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      <ImageCell src={sock.images_urls[0]} alt={sock.name} />
                    </StyledTableCell>
                    <StyledTableCell>{sock.vendor_code}</StyledTableCell>
                    <StyledTableCell>{sock.type}</StyledTableCell>
                    <StyledTableCell>{sock.style}</StyledTableCell>
                    <StyledTableCell className="size-cell">
                      {allSizes}
                    </StyledTableCell>
                      <StyledTableCell className={`price-cell ${sock.price2 ? 'lined' : ''}`}>
                        {sock.price}грн
                      </StyledTableCell>
                    <StyledTableCell className="discount-cell">
                      {sock.discountPercentage}%
                    </StyledTableCell>
                    <StyledTableCell sx={{ color: "green" }}>
                      {sock.price2 ? `${sock.price2}грн` : ''}
                    </StyledTableCell>
                    <StyledTableCell className="actions-cell">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <Link to={`/edit/${sock.vendor_code}`}>
                          <IconButton size="large" aria-label="edit">
                            <EditIcon fontSize="medium" />
                          </IconButton>
                        </Link>
                        <IconButton
                          size="large"
                          aria-label="delete"
                          color="error"
                          onClick={() => deleteThisItem(sock._id)}
                        >
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </div>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={socks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ height: "55px" }}
      />
    </Paper>
  );
};

export default ProductTable;
