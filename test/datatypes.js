const { expect } = require("chai");
const { Validator, datatypes } = require("../src");
const {describe, it} = require("mocha");


describe("datatypes", () => {
	describe("email", () => {
		const validator = new Validator().setDatatype(datatypes.email);
		it("should validate valid email", () => {
			expect(validator.validate("example@example.com")).to.be.true;
		});
		it("should not validate invalid email", () => {
			expect(validator.validate("example@.com")).to.be.false;
		});
	});

	describe("phone", () => {
		const validator = new Validator().setDatatype(datatypes.phone);
		it("should validate valid phone number with dashes", () => {
			expect(validator.validate("+123-456-7890")).to.be.true;
		});
		it("should validate valid phone number without dashes", () => {
			expect(validator.validate("+1234567890")).to.be.true;
		});
		it("should not validate invalid phone number", () => {
			expect(validator.validate("+1-23-4")).to.be.false;
		});
	});

	describe("postalCode", () => {
		const validator = new Validator().setDatatype(datatypes.postalCode);
		it("should validate valid US postal code", () => {
			expect(validator.validate("12345")).to.be.true;
		});
		it("should validate valid US postal code with extension", () => {
			expect(validator.validate("12345-6789")).to.be.true;
		});
		it("should not validate invalid US postal code", () => {
			expect(validator.validate("123456")).to.be.false;
		});
	});

	describe("ipv4", () => {
		const validator = new Validator().setDatatype(datatypes.ipv4);
		it("should validate valid IPv4 address", () => {
			expect(validator.validate("192.168.0.1")).to.be.true;
		});
		it("should not validate invalid IPv4 address", () => {
			expect(validator.validate("192.168.0.300")).to.be.false;
		});
	});

	describe("ipv6", () => {
		const validator = new Validator().setDatatype(datatypes.ipv6);
		it("should validate valid IPv6 address in full form", () => {
			expect(validator.validate("2001:0db8:85a3:0000:0000:8a2e:0370:7334")).to
				.be.true;
		});
		it("should validate valid IPv6 address with trailing double colon", () => {
			expect(validator.validate("2001:0db8::")).to.be.true;
		});
		it("should validate valid IPv6 address with one group of zeroes compressed", () => {
			expect(validator.validate("2001:0db8:85a3::8a2e:0370:7334")).to.be.true;
		});
		it("should validate valid IPv6 address with two groups of zeroes compressed", () => {
			expect(validator.validate("2001:0db8:85a3::8a2e:0370")).to.be.true;
		});
		it("should validate valid IPv6 address with three groups of zeroes compressed", () => {
			expect(validator.validate("2001:0db8::8a2e:0370:7334")).to.be.true;
		});
		it("should validate valid IPv6 address with four groups of zeroes compressed", () => {
			expect(validator.validate("2001:0db8:85a3::8a2e")).to.be.true;
		});
		it("should validate valid IPv6 address with IPv4-mapped IPv6 address", () => {
			expect(validator.validate("::ffff:192.0.2.1")).to.be.true;
		});
		it("should not validate invalid IPv6 address", () => {
			expect(validator.validate("2001::85a3::8a2e")).to.be.false;
		});
	});
});

