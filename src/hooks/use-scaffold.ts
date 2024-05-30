import type { ScaffoldProps } from '~/components/ui/scaffold'

export function useScaffold<Resp>(options: ScaffoldProps<Resp>) {
	return {
		scaffoldProps: options,
	}
}
