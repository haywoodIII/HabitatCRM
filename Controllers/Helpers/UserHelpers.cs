using System;
using System.Security.Claims;


using Microsoft.AspNetCore.Mvc;

namespace HabitatCRM.Controllers.Helpers
{
    public static class UserHelpersExtensions
    {
        public static Guid GetUserId(this ControllerBase controllerBase)
        {
            string objectIdentifier = "http://schemas.microsoft.com/identity/claims/objectidentifier";
            Claim identity = controllerBase.User.FindFirst(objectIdentifier);
            Guid objectId = Guid.Parse(identity.Value);
            return objectId;
        }
    }
}
