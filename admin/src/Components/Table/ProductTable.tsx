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
import react from "../assets/react.svg";

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
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ImageCell = styled("img")({
  width: "40px",
  height: "40px",
  objectFit: "contain",
});

const generateMockData = (count: number): Product[] => {
  const mockData: Product[] = [];
  const categories = [
    "Дитячі,Жіночі,Жіночі",
    "Жіночі,Жіночі,Жіночі,Жіночі",
    "Чоловічі",
  ];
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

const rows: Product[] = generateMockData(50);

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
    <Paper style={{ width: "85%", marginLeft: "auto", marginTop: "100px" }}>
      <TableContainer style={{ maxHeight: "650px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < rows.length
                  }
                  checked={rows.length > 0 && selected.length === rows.length}
                  onChange={handleSelectAllClick}
                />
              </StyledTableCell>
              <StyledTableCell>Назва</StyledTableCell>
              <StyledTableCell>Фото</StyledTableCell>
              <StyledTableCell>Артикул</StyledTableCell>
              <StyledTableCell>Категорія</StyledTableCell>
              <StyledTableCell>Стиль</StyledTableCell>
              <StyledTableCell>Розмір</StyledTableCell>
              <StyledTableCell>Ціна</StyledTableCell>
              <StyledTableCell>% знижки</StyledTableCell>
              <StyledTableCell>Спеціальна ціна</StyledTableCell>
              <StyledTableCell>Дії</StyledTableCell>
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
                    <StyledTableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </StyledTableCell>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>
                      <ImageCell src={row.photo} alt={row.name} />
                    </StyledTableCell>
                    <StyledTableCell>{row.article}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>{row.style}</StyledTableCell>
                    <StyledTableCell>{row.size}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>{row.discount}</StyledTableCell>
                    <StyledTableCell>{row.specialPrice}</StyledTableCell>
                    <StyledTableCell>
                      <IconButton size="small" aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        aria-label="delete"
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
