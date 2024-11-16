import {useNotifications} from "@toolpad/core";

export type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export type TUseNotifications = ReturnType<typeof useNotifications>;