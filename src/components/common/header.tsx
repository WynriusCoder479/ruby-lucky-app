import Image from 'next/image'

const Header = () => {
	return (
		<header className="sticky inset-x-0 top-0 z-50 flex w-full items-center justify-center border-b border-foreground/10 bg-background shadow-md">
			<div className="container flex items-center justify-between py-2.5">
				<Image
					src="/logo/ruby.png"
					alt="logo"
					width={3336}
					height={1144}
					className="w-28"
				/>
			</div>
		</header>
	)
}

export default Header
