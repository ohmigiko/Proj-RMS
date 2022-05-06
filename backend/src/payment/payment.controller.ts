import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.entity';
import { CreatePaymentDto } from './dto/createpPayment.dto';
import { Payment } from './payment.entity';
import { PaymentService } from './payment.service';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('payment')
export class PaymentController {
    constructor(private paymentService: PaymentService) { }

    @Post('/:id')
    createPayment(@Body() createPaymentDto: CreatePaymentDto, @Param('id') id: string, @GetUser() user: User): Promise<Payment> {
        return this.paymentService.createPayment(createPaymentDto, id, user);
    }

    @Get()
    getPayment(): Promise<Payment[]> {
        return this.paymentService.getPayment();
    }

    @Get('/:id')
    getPaymentById(@Param('id') id: string): Promise<Payment> {
        return this.paymentService.getPaymentById(id);
    }

}
