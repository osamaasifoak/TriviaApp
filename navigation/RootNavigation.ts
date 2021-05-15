import * as React from "react";

export const isReadyRef: any = React.createRef();

export const navigationRef: any = React.createRef();

export function navigate(name: any, params: any) {
	if (isReadyRef.current && navigationRef.current) {
		navigationRef.current.navigate(name, params);
	}
}
