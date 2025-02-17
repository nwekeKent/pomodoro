import "@testing-library/jest-dom";

// Mock next/image as a simple function
jest.mock(
	"next/image",
	() =>
		function Image() {
			return null;
		}
);

// Mock window.location
Object.defineProperty(window, "location", {
	value: {
		reload: jest.fn(),
	},
	writable: true,
});
