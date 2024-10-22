import React, { useState } from "react";
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
import react from "../../assets/react.svg";

interface Product {
  id: number;
  name: string;
  photo: string;
  article: string;
  category: string;
  style: string;
  size: string;
  price: string;
  discount: string;
  specialPrice: string;
}

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

const generateMockData = (count: number): Product[] => {
  const mockData: Product[] = [];
  const categories = ["Дитячі", "Жіночі", "Чоловічі"];
  const styles = ["Спорт", "Медичні", "Високі"];
  for (let i = 1; i <= count; i++) {
    mockData.push({
      id: i,
      name: `Шкарпетки ${i}`,
      photo: react,
      article: "32432567",
      category: categories[i % 3],
      style: styles[i % 3],
      size: "19-21, 21-23, 23-25, 25-27, 29-31",
      price: "250 UAH",
      discount: "20%",
      specialPrice: "200 UAH",
    });
  }
  return mockData;
};

const rows: Product[] = generateMockData(150);

const ProductTable: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [selected, setSelected] = useState<number[]>([]);

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
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

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
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <StyledTableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox" sx={{ width: "48px" }}>
                      <Checkbox checked={isItemSelected} />
                    </StyledTableCell>
                    <StyledTableCell className="name-cell">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      <ImageCell src={row.photo} alt={row.name} />
                    </StyledTableCell>
                    <StyledTableCell>{row.article}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>{row.style}</StyledTableCell>
                    <StyledTableCell className="size-cell">
                      {row.size}
                    </StyledTableCell>
                    <StyledTableCell className="price-cell">
                      {row.price}
                    </StyledTableCell>
                    <StyledTableCell className="discount-cell">
                      {row.discount}
                    </StyledTableCell>
                    <StyledTableCell sx={{ color: "green" }}>
                      {row.specialPrice}
                    </StyledTableCell>
                    <StyledTableCell className="actions-cell">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <IconButton size="large" aria-label="edit">
                          <EditIcon fontSize="medium" />
                        </IconButton>
                        <IconButton
                          size="large"
                          aria-label="delete"
                          color="error"
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
        count={rows.length}
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
