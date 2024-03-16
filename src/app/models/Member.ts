export class Member {
    Id: string = '' ?? undefined;
    FirstName: string = '' ?? undefined;
    LastName: string = '' ?? undefined;
    Email?: string = '' ?? undefined;
    IsAdult: boolean = true;
    IsVegan: boolean = false;
    RequiresAccommodation: boolean = false;
    RequiresPhisicalInvite: boolean = true;
    Allergies: string[] = [];

    public constructor(Id?: string, FirstName?: string, LastName?: string, IsAdult?: boolean, IsVegan?: boolean, RequiresPhisicalInvite?: boolean, RequiresAccommodation?: boolean, Email?: string, Allergies?: string[]){
        this.Id = Id ?? '';
        this.FirstName = FirstName ?? '';
        this.LastName = LastName ?? '';
        this.Email = Email ?? undefined;
        this.IsAdult = IsAdult ?? false;
        this.IsVegan = IsVegan ?? false;
        this.RequiresPhisicalInvite = RequiresPhisicalInvite ?? false;
        this.RequiresAccommodation = RequiresAccommodation ?? false;
        this.Allergies = Allergies ?? [];
    }
}