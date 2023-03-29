const assert = require("assert");
const { Validator, DataType } = require("../src/index.js");

const email = new DataType()
	.setName("email")
	.addRegex("email", /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

describe("DataType", () => {
	describe("removeRegex", () => {
		it("should remove a regex by its name", () => {
			const copyEmail = new DataType()
				.setName("email")
				.addRegex("email", /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
			copyEmail.removeRegex("email");
			assert.deepEqual(copyEmail.regexes, {});
		});
	});
});

describe("Validator", () => {
	describe("setDatatype", () => {
		it("should set the datatype", () => {
			const validator = new Validator().setDatatype(email);
			assert.equal(validator.datatype, email);
		});

		it("should throw an error if the datatype is not an instance of DataType", () => {
			const validator = new Validator();
			assert.throws(() => {
				validator.setDatatype("email");
			}, Error);
		});
	});

	describe("setSearchType", () => {
		it("should set and get the search type", () => {
			const validator = new Validator().setSearchType("all");
			assert.equal(validator.searchtype, "all");
		});

		it("should throw an error if the search type is not 'one' or 'all'", () => {
			const validator = new Validator();
			assert.throws(() => {
				validator.setSearchType("invalid_search_type");
			}, Error);
		});
	});

	describe("validate", () => {
		it("should return true for a valid email", () => {
			const validator = new Validator().setDatatype(email);
			assert.strictEqual(validator.validate("test@example.com"), true);
		});

		it("should return false for an invalid email", () => {
			const validator = new Validator().setDatatype(email);
			assert.strictEqual(validator.validate("invalid_email"), false);
		});

		it("should return true if any regex in the DataType matches when search type is 'one'", () => {
			const customDataType = new DataType()
				.setName("custom")
				.addRegex("pattern1", /^\d+$/)
				.addRegex("pattern2", /^[a-zA-Z]+$/);
			const validator = new Validator().setDatatype(customDataType).setSearchType("one");
			assert.strictEqual(validator.validate("123"), true);
			assert.strictEqual(validator.validate("abc"), true);
		});

		it("should return false if none of the regexes in the DataType match when search type is 'one'", () => {
			const customDataType = new DataType()
				.setName("custom")
				.addRegex("pattern1", /^\d+$/)
				.addRegex("pattern2", /^[a-zA-Z]+$/);
			const validator = new Validator().setDatatype(customDataType).setSearchType("one");
			assert.strictEqual(validator.validate("123abc"), false);
		});

		it("should return true if all regexes in the DataType match when search type is 'all'", () => {
			const customDataType = new DataType()
			.setName("custom")
			.addRegex("pattern1", /^[a-zA-Z0-9]+$/)
			.addRegex("pattern2", /^.{3,}$/);
		const validator = new Validator().setDatatype(customDataType).setSearchType("all");
		assert.strictEqual(validator.validate("abc123"), true);
	});

		it("should return false if not all regexes in the DataType match when search type is 'all'", () => {
			const customDataType = new DataType()
				.setName("custom")
				.addRegex("pattern1", /^[a-zA-Z0-9]+$/)
				.addRegex("pattern2", /^.{6,}$/);
			const validator = new Validator().setDatatype(customDataType).setSearchType("all");
			assert.strictEqual(validator.validate("abc12"), false);
		});
	});
});