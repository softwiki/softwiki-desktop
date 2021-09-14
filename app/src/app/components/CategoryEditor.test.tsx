import CategoryEditor, {Name, SaveButton, CancelButton} from "./CategoryEditor";
import {shallow, ShallowWrapper} from "enzyme";

describe("CategoryEditor component", () => {
	let categoryEditor: ShallowWrapper;
	const name = "name-test";

	let modifiedName = name;
	
	const onChange = (newName: string) => {
		modifiedName = newName;
	}

	beforeEach(() => {
		modifiedName = name;

		categoryEditor = shallow(
			<CategoryEditor
				name={name}
				onChange={onChange}
			/>
		)

		expect(categoryEditor.find(Name).prop("value")).toEqual(name);
		expect(categoryEditor.exists(SaveButton)).toBeTruthy();
		expect(categoryEditor.exists(CancelButton)).toBeTruthy();
	})

	test("Changing name without saving", () => {
		categoryEditor.find(Name).simulate("change", {target: {value: "ez"}})
		expect(modifiedName).toEqual(name);
	});

	test("Changing name and saving", () => {
		const newName = "ez";
		categoryEditor.find(Name).simulate("change", {target: {value: newName}})
		categoryEditor.find(SaveButton).simulate("click");
		expect(modifiedName).toEqual(newName);
	});

	test("Saving but without changing name", () => {
		categoryEditor.find(SaveButton).simulate("click");
		expect(modifiedName).toEqual(name);
	});

	test("Changing name but cancel", () => {
		categoryEditor.find(Name).simulate("change", {target: {value: "ez"}})
		categoryEditor.find(CancelButton).simulate("click");
		expect(modifiedName).toEqual(name);
	});
});