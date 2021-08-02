export function EmitWindowEvent(eventName: string, args?: unknown): void
{
	const event = new CustomEvent(eventName, {detail: args});
	window.dispatchEvent(event);
}

export function HandleWindowEvent(event: string, func: unknown): WindowEventRef
{
	window.addEventListener(event, func as EventListener);
	const ref = new WindowEventRef(event, func as EventListener);
	return ref;
}

export class WindowEventRef
{
	name: string
	func: EventListener
	constructor(name: string, func: EventListener)
	{
		this.name = name;
		this.func = func;
	}

	Delete(): void
	{
		window.removeEventListener(this.name, this.func as EventListener);
	}
}