import type { Activity } from "../types";

// Tipos de acciones que el reducer puede manejar
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

// Estado de la aplicación
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

// Leer actividades desde localStorage
const getActivitiesFromStorage = (): Activity[] => {
  const stored = localStorage.getItem("activities");
  return stored ? JSON.parse(stored) : [];
};

// Estado inicial
export const initialState: ActivityState = {
  activities: getActivitiesFromStorage(),
  activeId: "",
};

// Reducer principal
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "save-activity": {
      const isEditing = Boolean(state.activeId);
      const updatedActivities = isEditing
        ? state.activities.map((activity) =>
            activity.id === state.activeId ? action.payload.newActivity : activity
          )
        : [...state.activities, action.payload.newActivity];

      // Guardar en localStorage
      localStorage.setItem("activities", JSON.stringify(updatedActivities));

      return {
        ...state,
        activities: updatedActivities,
        activeId: "", // Resetear ID activo después de guardar
      };
    }

    case "set-activeId": {
      return {
        ...state,
        activeId: action.payload.id,
      };
    }

    case "delete-activity": {
      const filtered = state.activities.filter(
        (activity) => activity.id !== action.payload.id
      );

      localStorage.setItem("activities", JSON.stringify(filtered));

      return {
        ...state,
        activities: filtered,
      };
    }

    case "restart-app": {
      localStorage.removeItem("activities");
      return {
        activities: [],
        activeId: "",
      };
    }

    default:
      return state;
  }
};
