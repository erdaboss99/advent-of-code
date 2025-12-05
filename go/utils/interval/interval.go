package interval

type Range struct {
	Start int
	End   int
}

func (r *Range) Includes(val int) bool {
	return val >= r.Start && val <= r.End
}
