// mock data - in real app would be saved in a hash map to speed up lookups
const existingOrders = [
  {
    id: generateNumericValue(),
    customer: "Customer 1",
    address: "Some address 1",
    product: "Pizza",
    price: 10.2,
    notes: "bring it fast!",
  },
  {
    id: generateNumericValue(),
    customer: "Customer 2",
    address: "Nice address 2",
    product: "Sushi",
    price: 15.7,
    notes: "",
  },
  {
    id: generateNumericValue(),
    customer: "Customer 2",
    address: "Nice address 2",
    product: "Sushi",
    price: 18.7,
    notes: "Help!",
  },
  {
    id: generateNumericValue(),
    customer: "Customer 1",
    address: "Jerusalem",
    product: "Pizza",
    price: 80,
    notes: "",
  },
];

const existingCustomers = [
  {
    id: generateNumericValue(),
    text: "Customer 1",
    address: "Neverland",
  },
  {
    id: generateNumericValue(),
    text: "Customer 2",
    address: "Some nice address",
  },
];

const existingProducts = [
  {
    id: generateNumericValue(),
    text: "Pizza",
    price: 10,
  },
  {
    id: generateNumericValue(),
    text: "Sushi",
    price: 12,
  },
];
