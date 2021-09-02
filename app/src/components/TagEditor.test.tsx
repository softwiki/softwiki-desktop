import { SketchPicker } from "react-color";
import TagEditor, {Name, SaveButton, CancelButton, Color} from "./TagEditor";
import {shallow, ShallowWrapper} from "enzyme";

describe("TagEditor component", () =>
{
	let tagEditor: ShallowWrapper;
	const name = "name-test";
	const color = {r: 100, g: 100, b: 100}

	let modifiedName = name;
	let modifiedColor = color;
	
	const onChange = (newName: string, newColor: Color) =>
	{
		modifiedName = newName;
		modifiedColor = newColor;
	}

	beforeEach(() =>
	{
		modifiedName = name;
		modifiedColor = color;

		tagEditor = shallow(
			<TagEditor
				name={name}
				color={color}
				onChange={onChange}
			/>
		)

		expect(tagEditor.find(Name).prop("value")).toEqual(name);
		expect(tagEditor.exists(SaveButton)).toBeTruthy();
		expect(tagEditor.exists(CancelButton)).toBeTruthy();
		expect(tagEditor.exists(SketchPicker)).toBeTruthy();
	})

	test("Changing name without saving", () =>
	{
		tagEditor.find(Name).simulate("change", {target: {value: "ez"}})
		expect(modifiedName).toEqual(name);
	});

	test("Changing name and saving", () =>
	{
		const newName = "ez";
		tagEditor.find(Name).simulate("change", {target: {value: newName}})
		tagEditor.find(SaveButton).simulate("click");
		expect(modifiedName).toEqual(newName);
	});

	test("Changing color without saving", () =>
	{
		tagEditor.find(SketchPicker).simulate("change", {rgb: {r: 55, g: 55, b: 110, a: 0.7}})
		expect(modifiedColor).toStrictEqual(color);
	});

	test("Changing name and saving", () =>
	{
		const newColor = {r: 55, g: 55, b: 110, a: 0.7};
		tagEditor.find(SketchPicker).simulate("change", {rgb: newColor})
		tagEditor.find(SaveButton).simulate("click");
		expect(modifiedColor).toStrictEqual(newColor);
	});

	test("Saving but without changing name or color", () =>
	{
		tagEditor.find(SaveButton).simulate("click");
		expect(modifiedName).toEqual(name);
		expect(modifiedColor).toEqual(color);
	});

	test("Changing name and color but cancel", () =>
	{
		tagEditor.find(Name).simulate("change", {target: {value: "ez"}})
		tagEditor.find(SketchPicker).simulate("change", {rgb: {r: 55, g: 55, b: 110, a: 0.7}})
		tagEditor.find(CancelButton).simulate("click");
		expect(modifiedName).toEqual(name);
		expect(modifiedColor).toEqual(color);
	});
});