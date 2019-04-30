import stores from "@/store/modules/stores";
import places from "#/alessandrore";
import { decodeStores } from "@/helpers";

describe("Testing Getters", () => {
  const state = {
    all: [
      { id: 1, country: "italy" },
      { id: 3, country: "france" },
      { id: 5, country: "italy" }
    ],
    selectedId: 3
  };
  it("getSelectedStore", () => {
    expect(stores.getters.getSelectedStore(state)).toEqual({
      id: 3,
      country: "france"
    });
  });
  it("getDimensions", () => {
    expect(stores.getters.getDimensions(state)("country")).toEqual([
      "italy",
      "france"
    ]);
  });
});

describe("Testing Actions", () => {
  let actionNames;
  let obj;
  let payload;

  beforeEach(() => {
    actionNames = [];
    payload = {
      id: 1
    };
    obj = {
      id: 1,
      commit: (key, payload) => {
        actionNames.push({ key, payload });
      }
    };
  });
  // it("getAllStores", () => {
  //   stores.actions.getAllStores(obj);
  //   let allStores = decodeStores(places);
  //   expect(actionNames).toEqual([
  //     { key: "apiPending" },
  //     { key: "receiveAll", payload: allStores }
  //   ]);
  // });
  it("selectStore", () => {
    stores.actions.selectStore(obj, payload);
    expect(actionNames).toEqual([{ key: "selectStore", payload: { id: 1 } }]);
  });
});

describe("Testing Mutations", () => {
  let state;
  let storeId;

  beforeEach(() => {
    state = {
      selectedId: "",
      pending: false,
      all: [
        {
          name: "ciao - prova prova",
          id: 2,
          path: ""
        }
      ]
    };
    storeId = 2;
  });
  it("receiveAll", () => {
    const apiPendingState = { ...state, pending: true };
    stores.mutations.receiveAll(apiPendingState, [
      {
        name: "ciao - prova prova",
        id: 2,
        path: ""
      }
    ]);
    expect(apiPendingState).toEqual({
      ...apiPendingState,
      pending: false,
      all: [
        {
          name: "ciao - prova prova",
          id: 2,
          path: ""
        }
      ]
    });
  });
  it("apiPending", () => {
    stores.mutations.apiPending(state);
    expect(state).toEqual({ ...state, pending: true });
  });
  it("apiFailure", () => {
    stores.mutations.apiFailure(state);
    expect(state).toEqual({ ...state, pending: false, error: true });
  });
  it("selectStore", () => {
    stores.mutations.selectStore(state, storeId);
    expect(state).toEqual({
      ...state,
      selectedId: storeId,
      storeName: "ciao-provaprova",
      path: "/store-locator/ciao-provaprova-2"
    });
  });
});
