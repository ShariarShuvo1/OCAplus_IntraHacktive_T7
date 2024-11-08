export {};

export type Roles =
	| "oca"
	| "president"
	| "vicepresident"
	| "generalsecretary"
	| "treasurer";

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles;
		};
	}
}
