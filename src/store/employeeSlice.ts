
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  status: boolean;
  company: {
    name: string;
    title?: string;
    department?: string;
  };
}

interface EmployeeState {
  active: Employee[];
  deleted: Employee[];
  new: Employee[];
  loggedIn: boolean;
}

const initialState: EmployeeState = {
  active: [],
  deleted: [],
  new: [],
  loggedIn: false,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setActive(state, action: PayloadAction<Employee[]>) {
      state.active = action.payload;
    },
    setDeleted(state, action: PayloadAction<Employee[]>) {
      state.deleted = action.payload;
    },
    setNew(state, action: PayloadAction<Employee[]>) {
      state.new = action.payload;
    },
    addEmployee(state, action: PayloadAction<Employee>) {
      state.active.unshift(action.payload);
      state.new.unshift(action.payload);
    },
    deleteEmployee(state, action: PayloadAction<number>) {
      const idx = state.active.findIndex(u => u.id === action.payload);
      if (idx !== -1) {
        state.deleted.unshift(state.active[idx]);
        state.active.splice(idx, 1);
      }
    },
    restoreEmployee(state, action: PayloadAction<number>) {
      const idx = state.deleted.findIndex(u => u.id === action.payload);
      if (idx !== -1) {
        state.active.unshift(state.deleted[idx]);
        state.deleted.splice(idx, 1);
      }
    },
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
  },
});

export const { setActive, setDeleted, setNew, addEmployee, deleteEmployee, restoreEmployee, setLoggedIn } = employeeSlice.actions;
export default employeeSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
