﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inventory.Models;

namespace inventory.Controllers
{
    public class DashBoardController : ApiController
    {
        DashBoardPurchasePerDayBL objDashBoardPurchasePerDayBL = new DashBoardPurchasePerDayBL();
        DashBoardPurchasePerMonthBL objDashBoardPurchasePerMonthBL = new DashBoardPurchasePerMonthBL();
        DashBoardPurchaseOrderPerDayBL objDashBoardPurchaseOrderPerDayBL = new DashBoardPurchaseOrderPerDayBL();
        DashBoardPurchaseOrderPerMonthBL objDashBoardPurchaseOrderPerMonthBL = new DashBoardPurchaseOrderPerMonthBL();

        [HttpPost]
        [Route("api/DashBoard/postPurchasePerDay")]
        public HttpResponseMessage postPurchasePerDay(DashBoardPurchasePerDay objDashBoardPurchasePerDay)
        {
            try
            {
                DataTable dt = objDashBoardPurchasePerDayBL.postPurchasePerDayToDb(objDashBoardPurchasePerDay);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }


        [HttpPost]
        [Route("api/DashBoard/postPurchasePerMonth")]
        public HttpResponseMessage postPurchasePerMonth(DashBoardPurchasePerMonth objDashBoardPurchasePerMonth)
        {
            try
            {
                DataTable dt = objDashBoardPurchasePerMonthBL.postPurchasePerMonthToDb(objDashBoardPurchasePerMonth);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        [Route("api/DashBoard/postPurchaseOrderPerDay")]
        public HttpResponseMessage postPurchaseOrderPerDay(DashBoardPurchaseOrderPerDay objDashBoardPurchaseOrderPerDay)
        {
            try
            {
                DataTable dt = objDashBoardPurchaseOrderPerDayBL.postPurchasePerOrderDb(objDashBoardPurchaseOrderPerDay);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }

        [HttpPost]
        [Route("api/DashBoard/postPurchaseOrderPerMonth")]
        public HttpResponseMessage postPurchaseOrderPerMonth(DashBoardPurchaseOrderPerMonth objDashBoardPurchaseOrderPerMonth)
        {
            try
            {
                DataTable dt = objDashBoardPurchaseOrderPerMonthBL.postPurchaseOrderPerMonthToDb(objDashBoardPurchaseOrderPerMonth);
                return Request.CreateResponse(HttpStatusCode.OK, dt);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}
