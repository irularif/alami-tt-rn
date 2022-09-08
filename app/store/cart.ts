import { cloneDeep } from "lodash";
import { createContext } from "react";
import { IProduct } from "types/product";

export interface ICart {
  id: number;
  product: IProduct;
  qty: number;
  price: number;
}

export enum CartAction {
  AddOrUpdate,
}
export interface IState {
  data: Array<ICart>;
  isLoading: boolean;
}

export interface IAction {
  type: CartAction;
  payload: ICart;
}

const addOrUpdate = (state: IState, payload: ICart) => {
  const nstate = cloneDeep(state);
  const idx = nstate.data.findIndex((x) => x.id === payload.id);
  if (idx > -1) {
    if (payload.qty > 0) {
      Object.assign(nstate.data[idx], payload);
    } else {
      nstate.data.splice(idx, 1);
    }
  } else {
    nstate.data.push(payload);
  }
  return nstate;
};

const cartReducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case CartAction.AddOrUpdate:
      return addOrUpdate(state, action.payload);
    default:
      return state;
  }
};

export const CartContext = createContext<IState | undefined>(undefined);
export const CartDispatchContext = createContext<
  React.Dispatch<IAction> | undefined
>(undefined);

export default cartReducer;
